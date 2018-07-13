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
	self.isUpdate = ko.observable(false);
	self.types = ko.observableArray([
		'Health and Fitness',
		'Professional',
		'Relationships',
		'Self Help',
		'Technology'
	]);
	self.selectedGoals = ko.observableArray();
	self.canDelete = ko.computed(function(){
		return self.selectedGoals().length > 0;
	});
	self.canEdit = ko.computed(function(){
		return (self.selectedGoals().length == 1);
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

	self.editGoal = function(){
		var id = self.selectedGoals()[0]._id;
		self.goalNameInput(self.selectedGoals()[0].name);
		self.goalTypeInput(self.selectedGoals()[0].type);
		self.goalDeadLineInput(self.selectedGoals()[0].deadline);

		self.isUpdate(true);
	}

	self.updateGoal = function(){
		var id = self.selectedGoals()[0]._id;
		var name = $('#name').val();
		var type = $('#type').val();
		var deadline = $('#deadline').val();

		$.ajax({
			url: "http://localhost:3000/goals/" + id,
			data: JSON.stringify({
				"name": name,
				"type": type,
				"deadline": deadline
			}),
			contentType: "application/json",
			type: "PUT",
			async: true,
			timeout: 30000,
			success: function(data){
				console.log('Goal Updated Successfully');
			},
			error: function(xhr, status, err){
				console.log(err);
			}
		});



		self.goals.remove(function(item){
			return item._id == id;
		});

		self.goals.push({
			name: name,
			type:type,
			deadline: deadline
		});
	}
}

var viewModel = new ViewModel();

ko.applyBindings(viewModel);