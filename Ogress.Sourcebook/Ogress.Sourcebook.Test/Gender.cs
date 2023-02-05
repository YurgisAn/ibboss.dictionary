using System.ComponentModel.DataAnnotations;

namespace Ogress.Sourcebook.Test;

public enum Gender
{
    [Display(Name = "Мужчина111")]
    Male = 1,
    [Display(Name = "Женщина222")]
    Female = -1
}