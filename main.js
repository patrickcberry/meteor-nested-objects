Docs = new Mongo.Collection('docs');


Meteor.startup( function() {

	console.log("Startup");

	// Populate the database (if empty)

	if ( Meteor.isServer ) {

		console.log("Is server");

		// Add data if collection  is empty

		if ( Docs.find().count() <= 0 )	{

			console.log("Docs empty");

			var doc1 = {
				name: "Document 1",
				desc: "Description of document #1",				
				tags: {
					"tag1": {
						name: "Tag 1 name",
						desc: "Description of tag 1"
					},
					"tag2": {
						name: "Tag 2 name",
						desc: "Description of tag 2"
					},
					"tag3": {
						name: "Tag 3 name",
						desc: "Description of tag 3"
					}					
				}
			};

			var doc2 = {
				name: "Document 2",
				desc: "Description of document #2",				
				tags: {
					"tag1": {
						name: "Tag 1 name",
						desc: "Description of tag 1"
					},
					"tag2": {
						name: "Tag 2 name",
						desc: "Description of tag 2"
					}					
				}
			};
			Docs.insert(doc1);
			Docs.insert(doc2);

			console.log("Inserted records");
			console.log("Docs.count: " + Docs.find().count() );
		} else {
			console.log("Docs.count: " + Docs.find().count() );
		}

	}

	if ( Meteor.isClient ) {

	}

});


if ( Meteor.isClient ) {

	//
	// Template methods
	//

	//
	// Return all the documents
	//

	Template.documents.helpers ({
		docs: function() {
			return Docs.find();
		}
	});

	//
	// Return all of the tags
	//

	Template.tags.helpers ({
		tags: function() {
			// The object to be converted to an array
			var obj = Docs.findOne({_id:this._id}).tags;

			// Convert the tags object to an array
			var arr = Object.keys(obj).map(function (key) { 
				// Store the object key in the array object
				obj[key].key = key;
				// Return the array
				return obj[key]; 
			})
			return arr;
		}
	});

	//
	// Return a count of the tag objects
	//

	Template.tags.helpers ({
		count: function() {
			return Object.keys(Docs.findOne({_id:this._id}).tags).length;
		}
	});

}


