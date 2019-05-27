var Todo = require('./models/todo');

function getTodos(res) {
    Todo.find(function (err, todos) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }

        res.json(todos); // return all todos in JSON format
    });
};

module.exports = function (app) {

    // api ---------------------------------------------------------------------
    // get all todos
    app.get('/api/todos', function (req, res) {
        console.log("i received a get request")
        // use mongoose to get all todos in the database
        getTodos(res);
    });

    // create todo and send back all todos after creation
    app.post('/api/todos', function (req, res) {
        console.log(req.body);
        // create a todo, information comes from AJAX request from Angular
        Todo.create({
            name: req.body.name,
            balance: req.body.balance,
            id:req.body.id,
            done: false
        }, function (err, todo) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            getTodos(res);
        });

    });

    // delete a todo
    app.delete('/api/todos/:todo_id', function (req, res) {
        var id=req.params.todo_id;
        console.log(id);
        Todo.remove({
            _id: req.params.todo_id
        }, function (err, todo) {
            if (err)
                res.send(err);

            getTodos(res);
        });
    });

    app.get('/api/todos/:todo_id',function(req,res){
        Todo.findOne({
            _id: req.params.todo_id
        }),function(err,todo){
            res.send(err);
        }
    });

    app.put('/api/todos/:todo_id',function(req,res){
        var id=req.params.todo_id;
        var name=req.body.name;
        console.log(req.body.name);
        Todo.findAndModify({
            query:{
                _id: req.params.todo_id
            },update:{
                $set:{
                    name:req.body.name,
                    id:req.body.id,
                    balance:req.body.balance
                }
            },new:true},function(err,todo){
                res.send(err);
                });
    });

    // application -------------------------------------------------------------
    app.get('*', function (req, res) {
        res.sendFile(__dirname + '/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
};
