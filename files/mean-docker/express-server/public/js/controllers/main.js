angular.module('todoController', [])

	// inject the Todo service factory into our controller
	.controller('mainController', ['$scope','$http','Todos', function($scope, $http, Todos) {
		$scope.formData = {};
		$scope.loading = true;
        $scope.amount;
		$scope.formData1={};

		// GET =====================================================================
		// when landing on the page, get all todos and show them
		// use the service to get all the todos
		Todos.get()
			.success(function(data) {
				console.log("i got the data i requested")
				$scope.todos = data;
				$scope.loading = false;
			});

		// CREATE ==================================================================
		// when submitting the add form, send the text to the node API
		$scope.createTodo = function() {
			console.log($scope.formData);

			// validate the formData to make sure that something is there
			// if form is empty, nothing will happen
			if ($scope.formData.name != undefined) {
				$scope.loading = true;

				// call the create function from our service (returns a promise object)
				Todos.create($scope.formData)

					// if successful creation, call our get function to get all the new todos
					.success(function(data) {
						console.log(data);
						$scope.loading = false;
						$scope.formData = {}; // clear the form so our user is ready to enter another
						$scope.todos = data; // assign our new list of todos
					});
			}
		};

		// DELETE ==================================================================
		// delete a todo after checking it
		$scope.deleteTodo = function(id) {
			$scope.loading = true;
            console.log(id);
			Todos.delete(id)
				// if successful creation, call our get function to get all the new todos
				.success(function(data) {
					$scope.loading = false;
					$scope.todos = data; // assign our new list of todos
				});
		};

		// $scope.edit=function(id){
		// 	console.log(id);
        //     Todos.get(id).success(function(data){
		// 		$scope.todos=data;
		// 	});
		// };

		$scope.depositTodo=function(id){
			console.log($scope.formData.id);
			
			Todos.get().success(function(data){
				for(var idx in data){
					if(data[idx]["_id"]==id){
						$scope.loading = true;
						console.log("matching id:"+data[idx]["_id"]);
						console.log("origin balance:"+data[idx]["balance"]);
						console.log("added balance:"+$scope.balance);
						Todos.put(id,{amount:data[idx]["balance"]+parseFloat($scope.balance)}).success(function(data){
							var msg=JSON.stringify(data);
							console.log(msg);
							$scope.loading=false;
							$scope.todos=data;
						});
					}
				}
			});	
		}
			

		// var refresh=function(){
		// 	Todos.get().success(function(data){
		// 		console.log("i got the data i requested");
		// 		$scope.todos=data;
		// 		$scope.formData={};
		// 	})
		// }
	}]);
