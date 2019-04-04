using System;
using System.Collections.Generic;
using Blinq.Data;
using Blinq.Model;

namespace Blinq.Services
{
    public class MonitoringDataProcessor
    {
        private const string user = "jake0malay3@gmail.com";
        private const string user2 = "david0zin3@gmail.com";
        private static Dictionary<string, MonitoringInput> userData = new Dictionary<string, MonitoringInput>()
            {
                {user, null},
                {user2, null},
            };
        public static (MonitoringData, string) ProcessRawData(MonitoringInput rawData) {
            
            string log = "";

            foreach (var row in userData){
                 //check if user is needed user
                 if (row.Key == rawData.Email) {
                     
                     //check if it has recordings
                    if (row.Value == null) {
                        log += "user.value was null";
                        // if not -> then add a recording
                        userData[rawData.Email] = rawData;
                        log += " and I wrote some data";
                        return (null, log);
                    } else if (row.Value != null) {
                        log += "user.value was not null";
                        //compare times
                        var startTime = UnixTimeStampToDateTime(row.Value.Time);
                        var endTime = UnixTimeStampToDateTime(rawData.Time);
                        var timeSpent = endTime.Subtract(startTime);

                        MonitoringData result = new MonitoringData{
                            Id = Guid.NewGuid().ToString(),
                            Email = rawData.Email, 
                            Time = timeSpent.ToString(), 
                            Title = row.Value.Title, 
                            URL = row.Value.URL
                        };
                        return (result,log);
                    }

                }
            }
            return (null, log);
        }
        
        private static DateTime UnixTimeStampToDateTime( double unixTimeStamp )
        {
            // Unix timestamp is seconds past epoch
            System.DateTime dtDateTime = new DateTime(1970,1,1,0,0,0,0,System.DateTimeKind.Utc);
            dtDateTime = dtDateTime.AddSeconds( unixTimeStamp ).ToLocalTime();
            return dtDateTime;
        }
    }
}
