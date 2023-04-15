
phone_regex1 = [
    String.raw('(0[2-489])|'),          // Landline prefixes
    String.raw('(0[57]\d)|'),           // Mobile/Special phone prefixes
    String.raw('(.?\d{3}[ -]?\d{4})')   // Rest of the phonenumber
]
        
phone_regex2 = [
    String.raw('(\[.{3}\])|'),         // Match for brackets (if the prefix is 3 digits)
    String.raw('(.{2,3}[ -]?)'),       // Match for hifen/space between the prefix and the rest of the phone num
    String.raw('.+')                   // rest if the phone num
]

phone_regexes = [new RegExp(phone_regex1.join('')), new RegExp(phone_regex2.join(''))]