function filterProjectsOnceChosen(chosen){
    if(chosen.length == 0){ //If nothing chosen, then show all projects
        $("#project-list-to-filter").children().each(function(){
            $(this).show();
        })
    } else {
        $("#project-list-to-filter").children().each(function(){
            if(this.dataset.categories){
                var projCats = JSON.parse(this.dataset.categories)

                //Check that the current project has all of the required categories
                //Hence, the chosen categories must be a subset of the project's categories
                if(chosen.every(item => projCats.includes(item))){
                    $(this).show();
                } else {    //Otherwise, the project does not match the filters' and we hide it
                    $(this).hide();
                }
            } else {    //As the project has no categories, it cannot match the filter, so we hide it
                $(this).hide();
            }
        })
    }
}
