using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProductService.Domain.Entities
{
    public class Subwoofer : Product
    {
        public double SizeInInches { get; set; }
        public int RMSPower { get; set; }
        public int Impedance { get; set; }
    }
}
