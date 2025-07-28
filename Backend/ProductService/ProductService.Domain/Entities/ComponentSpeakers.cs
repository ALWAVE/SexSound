using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProductService.Domain.Entities
{
    public class ComponentSpeakers : Speakers
    {
        public int TweeterSize { get; set; }
        public int WooferSize { get; set; }
    }
}
