using System.ComponentModel.DataAnnotations;

namespace Ogress.Sourcebook.Test;

public enum Gender
{
    [Display(Name = "Мужчина")]
    Male = 1,
    [Display(Name = "Женщина")]
    Female = -1
}