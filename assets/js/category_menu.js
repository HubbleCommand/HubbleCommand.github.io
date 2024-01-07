var set = new Set()

function onCategoryClicked(category) {
    if (set.has(category)){
        set.delete(category)
    } else {
        set.add(category)
    }
    
    filterProjectsOnceChosen(Array.from(set))
}

function filterProjectsOnceChosen(chosen){
    $("#select-categories-projects").children().each(function(){
        if (set.has(this.value)) {
            this.classList.add("category-option-chosen")
        } else {
            this.classList.remove("category-option-chosen")
        }
    })

    if(chosen.length == 0){ //If nothing chosen, then show all projects
        $("#project-list-to-filter").children().each(function(){
            $(this).show();
        })
        $("#project-list-end").hide();
    } else {
        var filterResultCount = 0;
        $("#project-list-to-filter").children().each(function(){
            if(this.dataset.categories){
                var projCats = JSON.parse(this.dataset.categories)

                if (projCats[0] == "TITLE") {   //Always show title
                    $(this).show();
                    return;
                }
                //Check that the current project has all of the required categories
                //Hence, the chosen categories must be a subset of the project's categories
                if(chosen.every(item => projCats.includes(item))){
                    filterResultCount++;
                    $(this).show();
                } else {    //Otherwise, the project does not match the filters' and we hide it
                    $(this).hide();
                }
            } else {    //As the project has no categories, it cannot match the filter, so we hide it
                $(this).hide();
            }
        })
        if(filterResultCount > 0){
            $("#project-list-end").hide();
        } else {
            $("#project-list-end").show();
        }
    }
}
