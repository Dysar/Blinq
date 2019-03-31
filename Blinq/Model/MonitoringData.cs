using System.ComponentModel.DataAnnotations;

namespace Blinq.Model {

/*

Entity Framework goes by convention. That means that if you have an object with a property named Id, 
it will assume that it is the Primary Key for the object. That's why your LoginItemclass works fine.

Your UserItem class has no such property, and therefor it can't figure out what to use as the primary key.

To fix this, affix the KeyAttribute to whatever your primary key is on your class. For example:

*/ 
public class MonitoringData {
        public string Id {get;set;}
        public string Email {get;set;}
        public string Title {get;set;}
        public string URL {get;set;}
    }

}