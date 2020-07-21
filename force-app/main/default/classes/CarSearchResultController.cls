public with sharing class CarSearchResultController {
    @AuraEnabled(cacheable=true)
    public static List<Car__c> getCars(String carTypeId){
        if(String.isEmpty(carTypeId)) {
            return [
            SELECT Id, Name, Picture__c, Contact__r.Name, Car_Type__c, Build_Year__c,
                Geolocation__latitude__s, Geolocation__longitude__s, Per_Day_Rent__c,
                Mileage__c, Car_Type__r.Name
                FROM Car__c 
                WHERE Available_For_Rent__c = true ];
        } else {
            return [
                SELECT Id, Name, Picture__c, Contact__r.Name, Car_Type__c, Build_Year__c,
                    Geolocation__latitude__s, Geolocation__longitude__s, Per_Day_Rent__c,
                    Mileage__c, Car_Type__r.Name
                    FROM Car__c 
                    WHERE Available_For_Rent__c = true 
                    AND Car_type__c =: carTypeId ];
        }
    }
}
