using System;
using System.Collections.Generic;
using System.IO;
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
        public static (MonitoringData, string) ProcessRawData(MonitoringInput rawData, string path) {
            
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
                        
                        var id = Guid.NewGuid().ToString();
                        MonitoringData result = new MonitoringData{
                            Id = id,
                            Email = rawData.Email, 
                            Time = timeSpent.ToString(), 
                            Title = row.Value.Title, 
                            URL = row.Value.URL
                        };

                        //saveImageFile(id, rawData.ScreenShotBase64, path);
                        //replace recording
                        userData[rawData.Email] = rawData;
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

        private static bool saveImageFile(string filename, string base64Image, string path)
        {
            BinaryWriter Writer = null;
            var Data = Convert.FromBase64String(base64Image);
            string Name = path +filename+".png";

            try
            {
                // Create a new stream to write to the file
                Writer = new BinaryWriter(File.OpenWrite(Name));

                // Writer raw data                
                Writer.Write(Data);
                Writer.Flush();
                Writer.Close();
            }
            catch 
            {
                //...
                return false;
            }

            return true;
        }
    }
}
