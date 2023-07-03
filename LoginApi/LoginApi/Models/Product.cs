using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LoginApi.Models
{
    public class Product
    {
        public int id { get; set; }
        
        public string Pname { get; set; }
        public string size { get; set; }
        public string color { get; set; }
        public string Description { get; set; }
        public int Rate { get; set;}
        public int qty { get; set; }

    }
}
