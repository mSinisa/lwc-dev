public with sharing class ContactController {
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContacts(String textSearch){
        String s = '%' + textSearch + '%';
        return [SELECT Id, Name, FirstName, LastName, AccountId, Department, Email, Phone, Title 
            FROM Contact 
            WHERE Name LIKE :s
        ];
    }
}