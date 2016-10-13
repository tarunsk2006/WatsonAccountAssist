	
	var express   =    require("express");
	var mysql     =    require('mysql');
	var app       =    express();

	var con = mysql.createPool({
		connectionLimit: 4,
		host: process.env.DB_HOST,
		db: process.env.DB_SCHEMA,
		user: process.env.DB_USERNAME,
		password: process.env.DB_PASSWORD,
		port: process.env.DB_PORT
		});
	
	function handle_database(req,res) {
	    
	    pool.getConnection(function(err,connection){
	        if (err) {
	          res.json({"code" : 100, "status" : "Error in connection database"});
	          return;
	        }   

	        console.log('connected as id ' + connection.threadId);
	        
	        connection.query("select * from customers",function(err,rows){
	            connection.release();
	            if(!err) {
	                res.json(rows);
	            }           
	        });

	        connection.on('error', function(err) {      
	              res.json({"code" : 100, "status" : "Error in connection database"});
	              return;     
	        });
	  });
	}

	app.get("/",function(req,res){-
	        handle_database(req,res);
	});

	app.listen(3000);