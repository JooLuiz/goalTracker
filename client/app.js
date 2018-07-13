function getGoals(){
	$.get('http://localhost:3000/goals', function(data){
		viewModel.goals(data);
	});
}

function ViewModel(){
	var self = this;
	self.goals = ko.observableArray();
	self.goalNameInput = ko.observable();
	self.goalTypeInput = ko.observable();
	self.goalDeadLineInput = ko.observable();
	self.types = ko.observableArray([
		'Health and Fitness',
		'Professional',
		'Relationships',
		'Self Help',
		'Technology'
	]);
	self.addGoal = function(){
		var name = $('#name').val();
		var type = $('#type').val();
		var deadline = $('#deadline').val();

		self.goals.push({
			name: name,
			type:type,
			deadline: deadline
		});

		$.ajax({
			url: "http://localhost:3000/goals",
			data: JSON.stringify({
				"name": name,
				"type": type,
				"deadline": deadline
			}),
			type: "POST",
			contentType: "application/json",
			success: function(data){
				console.log('Goal Added Successfully');
			},
			error: function(xhr, status, err){
				console.log(err);
			}
		});
	}

	self.deleteGoal = function(){

	}
}

var viewModel = new ViewModel();

ko.applyBindings(viewModel);