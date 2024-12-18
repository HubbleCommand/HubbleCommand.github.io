---
layout      : project
title       : "Godot - Geometry Operations"
date        : 2024-10-02
categories  : ["GameDev", "Godot"]
---


## Distance between points
This is already part of the engine, and part of the [Vector2](https://docs.godotengine.org/en/stable/classes/class_vector2.html#class-vector2-method-distance-to) and [Vector3](https://docs.godotengine.org/en/stable/classes/class_vector3.html#class-vector3-method-distance-to) classes.



## Rect to Square
Only useful if you need to intersect a Rect with another shape, i.e. a polygon.
Then, you can use the polygon functions of [`Geometry2D`](https://docs.godotengine.org/en/stable/classes/class_geometry2d.html).

```
static func rect_to_square(rect: Rect2) -> PackedVector2Array:
	return PackedVector2Array([
		Vector2(rect.position),
		Vector2(rect.position.x + rect.size.x, rect.position.y),
		Vector2(rect.end),
		Vector2(rect.position.x, rect.position.y + rect.size.y),
	])
```

## Segment intersects line
Geometry2D has [line_intersects_line](https://docs.godotengine.org/en/stable/classes/class_geometry2d.html#class-geometry2d-method-line-intersects-line) and [segment_intersects_segment](https://docs.godotengine.org/en/stable/classes/class_geometry2d.html#class-geometry2d-method-segment-intersects-segment), but nothing to check if a segment intersects a line.

```
static func segment_intersects_line(from_line: Vector2, dir_line: Vector2, s1: Vector2, s2: Vector2) -> Variant:
	var to_line = dir_line + from_line
	
	#If either point is on the line
	var b_over_a = dir_line.x / dir_line.y
	var c = from_line.y - (b_over_a * from_line.x)
	
	#Using y = mx + c and plugging s1 and s2 into it...
	var s1_intersects = s1.y == (b_over_a * s1.x) + c
	var s2_intersects = s2.y == (b_over_a * s2.x) + c
	
	#https://math.stackexchange.com/a/4003918
	var p1	#s1
	var p2	#s2
	var p3	#from_line
	var p4	#to_line
	
	#var calc = ((p4 - p3) * (p1 - p3)) * ((p4 - p3) * (p2 - p3))
	var calc = ((to_line - from_line) * (s1 - from_line)) * ((to_line - from_line) * (s2 - from_line))
	var intersects = calc <= 0
	
	if intersects:
		#This assumption is SO WRONG
		#return Geometry2D.segment_intersects_segment(from_line, to_line, s1, s2)
		#If the segment intersects, then the LINE of the segment must intersect, so can compare LINES, not SEGMENTS
		#return Geometry2D.line_intersects_line(from_line, dir_line, s1, s2 - s1)
		var intersection = Geometry2D.line_intersects_line(from_line, dir_line, s1, s2 - s1)
		if intersection == null:
			print("BAD")	#above we check if there is an intersection... so if there isn't once, something is fucky...
		return intersection
	
	return null
```

## Nearest point on polygon from point
> [Full project with code][1]

[1]:{{ site.url }}/assets/godot/geometry_ops.zip


I completely forgot why I needed this... but I did.

I tried to see if this type function existed on [Polygon2D](https://docs.godotengine.org/en/stable/classes/class_polygon2d.html) or [CSGPolygon3D](https://docs.godotengine.org/en/stable/classes/class_csgpolygon3d.html#csgpolygon3d), but they don't.
There may be something similar hidden in the sources of the various [CSG](https://docs.godotengine.org/en/stable/tutorials/3d/csg_tools.html) classes,
but I haven't checked as I would have to modify the engine to expose those functions.

Lastly, [Geometry2D](https://docs.godotengine.org/en/stable/classes/class_geometry2d.html) doesn't have it.

So, off I go to do it myself.

### If no assumptions can be made
If we cannot make assumptions about the shape of the polygon, then we have to check each segment of the polygon.
Thankfully, [Geometry2D.get_closest_point_to_segment](https://docs.godotengine.org/en/stable/classes/class_geometry2d.html#class-geometry2d-method-get-closest-point-to-segment) exists.

This allows us to easily write the following function:

```
func get_closest_point_to_polygon(point: Vector2, polygon: PackedVector2Array) -> Vector2:
	var closest_point: Vector2 = Geometry2D.get_closest_point_to_segment(point, polygon[polygon.size() - 1], polygon[0])
	var closest_distance: float = point.distance_to(closest_point)
	
	for i in range(polygon.size() - 1):
		var pnt = Geometry2D.get_closest_point_to_segment(point, polygon[i], polygon[i + 1])
		var dst = point.distance_to(pnt)
		if dst < closest_distance:
			closest_point = pnt
			closest_distance = dst
	
	return closest_point
```

> Note that the polygon points and point must be in the same local / global space, so transform them as necessary


### If Polygon is bounded and "normal"
Let's assume we know the bounding Rect of the polygon, and that the polygon has a "normal" shape.

This may be the case if we are using a Grid or a QuadTree, or if using something like the [Polygon2D](https://docs.godotengine.org/en/stable/classes/class_polygon2d.html) node.
Getting the [Rect2](https://docs.godotengine.org/en/stable/classes/class_rect2.html) of a `Polygon2D` node is a bit of a pain.
All `Control` nodes have [get_rect](https://docs.godotengine.org/en/stable/classes/class_control.html#class-control-method-get-rect), however this is not available for `Node2D`.

Polygon2D does store rect, [but only in c++](https://github.com/godotengine/godot/blob/master/scene/2d/polygon_2d.h#L65).

Looking at that showed me a c++ keyword I hadn't seen before: `mutable` [1](https://en.cppreference.com/w/cpp/language/cv)[2](https://www.geeksforgeeks.org/c-mutable-keyword/)

So, we're going to need a function to calculate the rect:
```
func get_rect(polygon: PackedVector2Array) -> Rect2:
	var rect = Rect2(polygon[0], Vector2.ZERO)
	for point in polygon:
		rect = rect.expand(point)
	return rect
```

We can, probably, cast a ray to the center of the rect.
If there are overhangs, or the points aren't uniformely distributed, this will not work.
Generally speaking, convex polygons should work, but there is no guarantee this will work for concave polygons.

```
func get_closest_point_to_polygon_bounded(point: Vector2, polygon: PackedVector2Array, bounds: Rect2) -> Vector2:
	print(polygon)
	print(bounds)
	var center = bounds.get_center()
	
	var intersections = Geometry2D.intersect_polyline_with_polygon(
		PackedVector2Array([point, center]),
		polygon
	)
	print(intersections)
	
	if not intersections.size() > 0:
		return Vector2.INF
	return intersections[0][intersections[0].size() - 1]

```

I assumed this would be faster, as this only does one major geometry operation:
[intersect_polyline_with_polygon](https://github.com/godotengine/godot/blob/master/core/math/geometry_2d.h#L317), which calls [_polypaths_do_operation](https://github.com/godotengine/godot/blob/master/core/math/geometry_2d.cpp#L198).

I wanted to test my hypothesis and verify the performance of the two approaches, so I created a few Polygon2Ds and added a few tests:
```
@onready var p1 = $Polygon2D1
@onready var p2 = $Polygon2D2
@onready var p3 = $Polygon2D3

func  _ready() -> void:
	test_polygon(p1.name, Vector2.ZERO, p1.polygon)
	test_polygon(p2.name, Vector2.ZERO, p2.polygon)
	test_polygon(p3.name, Vector2.ZERO, p3.polygon)

func test_polygon(name: String, point: Vector2, polygon: PackedVector2Array):
	print("Starting test for: %s" % [name])
	var rect = get_rect(polygon)
	
	var ti = Time.get_ticks_usec()
	var intersections_bounded = get_closest_point_to_polygon_bounded(point, polygon, rect)
	var tb = Time.get_ticks_usec()
	
	var intersections_unbounded = get_closest_point_to_polygon(point, polygon)
	var tub = Time.get_ticks_usec()
	
	var bounded_elapsed = tb - ti
	var unbounded_elapsed = tub - tb
	print("unbounded elapsed: %s, bounded elapsed: %s" % [unbounded_elapsed, bounded_elapsed])
```

However, after running these tests, the unbounded method is actually much faster!
4 to 10 times faster!
I was certainly surprised by this result.


## Useless intersections

Things like `line_intersects_rect` and `segment_intersects_rect` can be done with [`Geometry2D.intersect_polyline_with_polygon`](https://docs.godotengine.org/en/stable/classes/class_geometry2d.html#class-geometry2d-method-intersect-polyline-with-polygon).
