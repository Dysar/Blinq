using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Blinq.Controllers
{
    [Route("api/[controller]")]
    public class ProductPricesController : Controller
    {

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductResponse>>> MonitoringDatas(string type)
        {

            using (HttpClient client = new HttpClient())
            {
                var initialProducts = await client.GetAsync("http://localhost:9999/products");

                var productsToSend = new List<ProductResponse>();
                if (initialProducts != null)
                {
                    var jsonString = await initialProducts.Content.ReadAsStringAsync();
                    var convertedProducts = JsonConvert.DeserializeObject<List<Product>>(jsonString);
                    
            
                    if (type == "loyal")
                    {
                         foreach(var p in convertedProducts) {
                             var productExternal = await client.GetAsync("http://localhost:9999/prices?code=" + p.code);
                            
                             if (productExternal != null) {
                                var jsonPe = await productExternal.Content.ReadAsStringAsync();
                                var convertedPe = JsonConvert.DeserializeObject<ProductPrice>(jsonPe);
                                productsToSend.Add(
                                    new ProductResponse
                                    { productCode = p.code, 
                                      productName = p.name, 
                                      productDescription = p.description, 
                                      price = convertedPe.loyalprice});
                            }

                        }
                    } else if (type == "normal"){
                        foreach(var p in convertedProducts) {
                             var productExternal = await client.GetAsync("http://localhost:9999/prices?code=" + p.code);
                            
                            if (productExternal != null) {
                                var jsonPe = await productExternal.Content.ReadAsStringAsync();
                                var convertedPe = JsonConvert.DeserializeObject<ProductPrice>(jsonPe);
                                productsToSend.Add(
                                    new ProductResponse
                                    { productCode = p.code, 
                                      productName = p.name, 
                                      productDescription = p.description, 
                                      price = convertedPe.price});
                            }

                        }
                    }
                }

                return Ok(productsToSend);
            }

        } 
    }
    public class ProductPrice {
        public string code {get;set;}
        public uint price {get;set;}
        public uint loyalprice {get;set;}
    }
    public class Product {
        public string code {get;set;}

        public string name {get;set;}

        public string description {get;set;}
    }
    public class ProductResponse {
        public string productCode {get;set;}
        public string productName {get;set;}
        public string productDescription {get;set;}
        public uint price {get;set;}
    }
}
