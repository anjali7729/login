using LoginApi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LoginApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly UserContext _context;

        public UserController(IConfiguration config,UserContext context)
        {
            _config = config;
            _context = context;

        }

        [AllowAnonymous]
        [HttpPost("CreateUser")]
        public IActionResult Create(User user)
        {
            if(_context.Users.Where(u=> u.Email == user.Email).FirstOrDefault() != null)
            {
            return Ok("Email ALready Exist");
            }
            user.MemberSince = DateTime.Now;
            _context.Users.Add(user);
            _context.SaveChanges();
            return Ok("Success");
        }

        [AllowAnonymous]
        [HttpPost("Loginuser")]
        public IActionResult Login(Login user)
        {
            var userAvailable = _context.Users.Where(u => u.Email == user.Email && u.Pwd == user.Pwd).FirstOrDefault();
            if(userAvailable != null)
            {
                return Ok(new JwtService(_config).GenerateToken(
                    userAvailable.UserID.ToString(),
                    userAvailable.FirstName,
                    userAvailable.LastName,
                    userAvailable.Email,
                    userAvailable.Mobile,
                    userAvailable.Gender
                       
                    )
                ) ;
            }
            return Ok("Fail");
        }


        [HttpGet]
        [Route("GetProduct")]
        
        public async Task<IEnumerable<Product>> GetProducts()
        {
            return await _context.Products.ToListAsync();
        }

        [HttpPost]
        [Route("AddProduct")]

        public async Task<IActionResult> AddProduct(Product objpro)
        {
            var alreadyexist = await _context.Products.Where(p => p.Pname.ToLower() == objpro.Pname.ToLower()).FirstOrDefaultAsync();
            if(alreadyexist != null)
            {
                return Ok("Fail");
            }
            _context.Products.Add(objpro);
            await _context.SaveChangesAsync();
            return Ok(objpro);
        }

        [HttpPut]
        [Route("UpdateProduct/{id}")]
         public async Task<IActionResult> UpdateProduct(Product objPro)
        {
            var alreadyexist = await _context.Products.Where(p => p.Pname.ToLower() == objPro.Pname.ToLower()).FirstOrDefaultAsync();
            if (alreadyexist != null)
            {
                return Ok("Fail");
            }
            _context.Entry(objPro).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return Ok(objPro);

        }

        [HttpDelete]
        [Route("DeleteProduct")]
         public async Task<bool> DeleteProduct(int id)
        {
            bool a = false;
            var product = _context.Products.Find(id);
            if(product != null)
            {
                a = true;
                _context.Entry(product).State = EntityState.Deleted;
                _context.SaveChanges();
            }
            else
            {
                a = false;
            }
            return a;
        }

        //public async Task<bool> CheckDublicate(string pname)
        //{
        //    var exist = await _context.Products.FirstOrDefaultAsync(user => user.Pname == pname);
        //    if(exist != null)
        //    {
        //        return true;
        //    }
        //    return false;
        //}

    }
}

