describe("week selector", function() {
    describe("with year defined", function() {
        var scope, _Date, today;

        beforeEach(module('ui.weekselector'));

        beforeEach(inject(function($controller, $rootScope) {
            today = "2014-04-07T11:59:01.913Z";
            _Date = Date;
            Date = function(someDay) {
                return someDay ? new _Date(someDay) : new _Date(today);
            };
            Date.UTC = _Date.UTC;

            scope = $rootScope.$new();
            scope.startYear = 2012;
            $controller('WeekSelectorController', {
                $scope: scope
            });
        }));

        afterEach(function() {
            Date = _Date;
        });

        it('should initialize years', function() {
            expect(scope.years).toEqual([2012, 2013, 2014]);
        });

        it('should populate all months when year selected is not current year', function() {
            scope.year = 2013;

            scope.populateMonths();

            expect(scope.months).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
            expect(scope.month).toEqual(undefined);
            expect(scope.week).toEqual(undefined);
            expect(scope.weeks).toEqual([]);
        });

        it('should populate till current month when year selected is current year', function() {
            scope.year = 2014;

            scope.populateMonths();

            expect(scope.months).toEqual([0, 1, 2, 3]);
        });

        it('should initialize months and weeks if year is reset', function() {
            scope.year = undefined;

            scope.populateMonths();

            expect(scope.month).toEqual(undefined);
            expect(scope.week).toEqual(undefined);
            expect(scope.months).toEqual([]);
            expect(scope.weeks).toEqual([]);
        });

        it('should initialize weeks if month is reset', function() {
            scope.month = undefined;

            scope.populateWeeks();

            expect(scope.week).toEqual(undefined);
            expect(scope.weeks).toEqual([]);
        });

        it('should populate all weeks for month when date selected is not of current month', function() {
            scope.year = 2014;
            scope.month = 2;
            scope.populateWeeks();

            expect(scope.weeks).toEqual([{
                weekNumber: 9,
                startOfWeek: '2014-02-24',
                endOfWeek: '2014-03-02'
            }, {
                weekNumber: 10,
                startOfWeek: '2014-03-03',
                endOfWeek: '2014-03-09'
            }, {
                weekNumber: 11,
                startOfWeek: '2014-03-10',
                endOfWeek: '2014-03-16'
            }, {
                weekNumber: 12,
                startOfWeek: '2014-03-17',
                endOfWeek: '2014-03-23'
            }, {
                weekNumber: 13,
                startOfWeek: '2014-03-24',
                endOfWeek: '2014-03-30'
            }, {
                weekNumber: 14,
                startOfWeek: '2014-03-31',
                endOfWeek: '2014-04-06'
            }]);
        });

        it('should populate weeks till last week for month when date selected is today', function() {
            scope.year = 2014;
            scope.month = 3;
            scope.populateWeeks();

            expect(scope.weeks).toEqual([{
                weekNumber: 14,
                startOfWeek: '2014-03-31',
                endOfWeek: '2014-04-06'
            }]);
        });
    });

    describe("with year undefined", function() {
        var scope, _Date, today;

        beforeEach(module('ui.weekselector'));

        beforeEach(inject(function($controller, $rootScope) {
            today = "2014-04-07T11:59:01.913Z";
            _Date = Date;
            Date = function(someDay) {
                return someDay ? new _Date(someDay) : new _Date(today);
            };
            Date.UTC = _Date.UTC;

            scope = $rootScope.$new();
            $controller('WeekSelectorController', {
                $scope: scope
            });
        }));

        afterEach(function() {
            Date = _Date;
        });

        it('should initialize years', function() {
            expect(scope.startYear).toEqual(1900);
            expect(scope.years.length).toEqual(2014 - 1900 + 1);
        });
    });
});