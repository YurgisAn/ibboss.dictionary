
using System.ComponentModel.DataAnnotations;

namespace Ogress.Sourcebook.Test;
public enum HolidayType
{
    [Display(Name = "Выходной")]
    DayOff = 0,
    [Display(Name = "Рабочий")]
    DayOn = 1
}
