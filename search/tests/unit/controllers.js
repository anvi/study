'use strict';

/* jasmine specs for controllers go here */

var ctrl, scope, httpMock;

beforeEach(inject(function($controller, $rootScope, $httpBackend) {
    httpMock = $httpBackend;
    scope = $rootScope.$new();

    var data = [
    {
        "fiscal_year": 2009,
        "term": 1212,
        "reference": "03055MR1212",
        "amount": "446,88 €",
        "status": "Couverte",
        "detail": "Régulière | Pas d'affectation"
    },
    {
        "fiscal_year": 2010,
        "term": 1213,
        "reference": "03055MR1438",
        "amount": "156.32 €",
        "status": "Couverte",
        "detail": "Régulière | Pas d'affectation"
    }];

    // backend definition common for all tests
    httpMock.when('GET', 'items.json').respond(data);

    ctrl = $controller("ItemListCtrl", {
        $scope: scope
    });
    
    httpMock.flush();
}));

afterEach(function() {
    httpMock.verifyNoOutstandingExpectation();
    httpMock.verifyNoOutstandingRequest();
});

describe('ItemListCtrl', function(){
    it('should have items', function() {
        expect(scope.items).toBeDefined();
        expect(scope.items.length).toBe(2);
    });

    it('should have pager', function() {
        expect(scope.pages).toBeDefined();
        expect(scope.pages instanceof Util.Pager).toBeTruthy();
    });
});