'use strict';

/* jasmine specs for controllers go here */

var pager;

beforeEach(function() {
    var data = [
    {
        "fiscal_year": 2009,
        "reference": "03055MR1212",
        "amount": "446,88 €"
    },
    {
        "fiscal_year": 2010,
        "reference": "03055MR1438",
        "amount": "156.32 €"
    },
    {
        "fiscal_year": 2010,
        "reference": "03055MR1438",
        "amount": "156.32 €"
    }];

    pager = new Util.Pager(data);
});

afterEach(function() {
    
});

describe('Pager', function(){
    it('should initialize properties', function() {
        expect(pager.current).toBe(0);
        expect(pager.itemCountPerPage).toBe(10);
    });

    it('should page have items', function() {
        expect(pager.content(0).length).toBe(3);
        expect(pager.content(1).length).toBe(3);
    });

    it('should change items per page', function() {
        expect(pager.pageCount).toBe(1);

        pager.itemCountPerPage = 2;
        expect(pager.pageCount).toBe(2);

        expect(pager.content(0).length).toBe(2);
        expect(pager.content(1).length).toBe(1);
    });

    it('should go to prev page', function() {
        pager.itemCountPerPage = 1;
        pager.current = 2;

        pager.prev();
        expect(pager.current).toBe(1);
    });

    it('should go to prev page when is already the first page', function() {
        pager.prev();
        expect(pager.current).toBe(0);
    });

    it('should go to next page', function() {
        pager.itemCountPerPage = 1;

        pager.next();
        expect(pager.current).toBe(1);
    });

    it('should go to next page when is already the last page', function() {
        pager.current = 2;
        pager.next();
        expect(pager.current).toBe(2);
    });

    it('should go to first page', function() {
        pager.itemCountPerPage = 1;
        pager.current = 1;

        pager.first();
        expect(pager.current).toBe(0);
    });

    it('should go to last page', function() {
        pager.itemCountPerPage = 1;

        pager.last();
        expect(pager.current).toBe(2);
    });
});