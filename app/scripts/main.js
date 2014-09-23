$(document).ready(function() {

//hides the new item form
$('#form').hide();


//click on plus hides the plus and shows the form
$('#plus').on('click', function(){
	$('#newItemHeader').hide();
	$('#form').show();
});

//back to natural display hides form
$('#cancel').on('click', function (e) {
        e.preventDefault();
        $('#newItemHeader').show();
        $('#form').hide();
});

//empty array to store items from the input
var listo = [];

//An object constructor function for making new tasks
var Task = function(task) {
		this.task = task;
		this.id = 'new';
	}

//adding a new task and pushing it to the array listo
var addTask = function(task) {
		if(task) {
			//creates the new task object
			task = new Task(task);
			//adds the task object to the array
			listo.push(task);
			save();
			//resets the input back to empty
			$('#newItemInput').val('');

			//
			$('#newList').append('<a href="#finish" class="" id="item"><li class="list-group-item">' + task.task + '<span class="arrow pull-right"><i class="glyphicon glyphicon-arrow-right"></span></li></a>');

		}
		$('#form').fadeToggle('fast', 'linear');
        $('#newItemHeader').show();

	};


	$('#saveNewItem').on('click', function (e) {
        e.preventDefault();
        var task = $('#newItemInput').val().trim();
        addTask(task);
    });

    $(document).on('click', '#item', function(e) {
		e.preventDefault();
        var task = this;		
        advanceTask(task);
        this.id = 'inProgress';
        $('#currentList').append(this.outerHTML);

	});

    $(document).on('click', '#inProgress', function (e) {
        e.preventDefault();
        var task = this;
        task.id = "archived";
        var changeIcon = task.outerHTML.replace('glyphicon-arrow-right', 'glyphicon-remove');
        advanceTask(task);
        $('#archivedList').append(changeIcon);
    });

    $(document).on('click', '#archived', function(e){
    	e.preventDefault();
    	var task = this;
    	advanceTask(task);
    })

        //A function that identifies tasks and changes their id 
    var advanceTask = function (task) {
        var modified = task.innerText.trim();
        for (var i = 0; i < listo.length; i++) {
            if (listo[i].task === modified) {
                if (listo[i].id === 'new') {
                    listo[i].id = 'inProgress';
                } else if (listo[i].id === 'inProgress') {
                    listo[i].id = 'archived';
                } else {
                    listo.splice(i, 1);
                }
                save();
                break;
            }
        }
        task.remove();
    };

     var populateLists = function () {
        var storedList = JSON.parse(localStorage.getItem("listo"));
        for (var i = 0; i < storedList.length; i++) {
            if (storedList[i].id === 'new') {
                $('#newList').append('<a href="#finish" class="" id="item"><li class="list-group-item">' + storedList[i].task + '<span class="arrow pull-right"><i class="glyphicon glyphicon-arrow-right"></span></li></a>');
            } else if (storedList[i].id === 'inProgress') {
                $('#currentList').append('<a href="#finish" class="" id="inProgress"><li class="list-group-item">' + storedList[i].task + '<span class="arrow pull-right"><i class="glyphicon glyphicon-arrow-right"></span></li></a>');
            } else {
                $('#archivedList').append('<a href="#finish" class="" id="archived"><li class="list-group-item">' + storedList[i].task + '<span class="arrow pull-right"><i class="glyphicon glyphicon-remove"></i></span></li></a>');
            }
        }
    };

    var save = function () {
        localStorage["listo"] = JSON.stringify(listo);
    };

 if (localStorage.getItem("listo")) {
        listo = JSON.parse(localStorage["listo"]);
        populateLists();
    }


});