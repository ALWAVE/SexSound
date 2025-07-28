using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProductService.Domain.Entities
{
    public class Speakers : Product
    {
        public int RatedPower { get; set; }
        public double Sensitivity { get; set; }
        public SpeakerType Type { get; set; }  
    }
}
