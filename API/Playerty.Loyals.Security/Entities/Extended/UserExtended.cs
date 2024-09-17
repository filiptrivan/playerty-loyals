using Soft.Generator.Security.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Playerty.Loyals.Business.Entities.Extended
{
    public class UserExtended : User
    {
        public int Points { get; set; }
    }
}
