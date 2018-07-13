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
	self.selectedGoals = ko.observableArray();
	self.canEdit = ko.computed(function(){
		return self.selectedGoals().length > 0;
	});
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
		$.each(self.selectedGoals(), function(index, value){
			var id = self.selectedGoals()[index]._id;
			$.ajax({
				url: "http://localhost:3000/goals/" + id,
				type: "DELETE",
				async: true,
				timeout: 30000,
				success: function(data){
					console.log('Goal Deleted Successfully');
				},
				error: function(xhr, status, err){
					console.log(err);
				}
			});
		});
		self.goals.removeAll(self.selectedGoals());
		self.selectedGoals.removeAll();
	}
}

var viewModel = new ViewModel();

ko.applyBindings(viewModel);