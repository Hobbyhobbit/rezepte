###
Rezepte -- {name: String,
            text: String,
            timestamp: Number,
            }
Rezepte = new Mongo.Collection 'rezepte'
Meteor.publish 'rezepte', -> Rezepte.find()


Zutaten -- {name: String,
            density: Number,
            season: [Number, ...]
            recipes: [id, ...]
            }
Zutaten = new Mongo.Collection 'zutaten'
Meteor.publish 'zutaten', -> Zutaten.find()
@Zutaten = Zutaten


Tags -- {name: String,
          rezept: [id, ...]
          }

Tags = new Mongo.Collection 'tags'
Meteor.publish 'tags', -> Tags.find()

###

