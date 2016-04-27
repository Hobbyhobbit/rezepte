Meteor.publish('rezepte', function() { return Rezepte.find(); });
Meteor.publish('zutaten', function() { return Zutaten.find(); });
Meteor.publish('tags', function() { return Tags.find(); });

Meteor.publish('images', function(){ return Images.find({}); });


Meteor.methods({

    updateTags: function(rezept_id, tags) {
        
        // Remove all references to this recipe in all Tags
        Tags.update({}, {$pull: {'rezept': rezept_id}}, {multi: true})
        
        tags.forEach(function(tagname) {
            // Create not yet existing tags
            if ( Tags.find({'name': tagname}).count() == 0 ){
                Tags.insert({'name': tagname});
            }
            Tags.update({'name': tagname}, {$push: {'rezept': rezept_id}});
        });

        // Garbage collection
        Tags.remove({'rezept':[]});
    }
});

Picker.route('/:name/img/:img', function(params, req, res, next) {
    var r = Rezepte.findOne({url: params.name});
    var img_id = r && r.images && r.images[ params.img ];
    var img = img_id && Images.findOne( img_id );

    if ( img ){
        var stream = img.createReadStream('full');

        res.writeHeader(200, {
            'Content-Type': img.original.type
        });

        stream.on('open', function () {
            stream.pipe(res);
        });

        stream.on('error', function(err) {
            res.end(err);
        });

        stream.on('end', function() {
            res.end();
        });

    } else {
        res.writeHeader(404);
        res.end();
    }
});

