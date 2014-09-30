describe("Time module", function () {
    it("find day of week", function () {
        expect(org.rr0.time.getDayOfWeek(1998, 8, 31)).toBe(1);
        expect(org.rr0.time.dayOfWeekNam(0)).toBe('Dimanche');
        expect(org.rr0.time.dayOfWeekNam(1)).toBe('Lundi');
    });
    it("sets current month", function () {
        org.rr0.time.setMonth(2);
        expect(org.rr0.time.getMonth()).toBe(2);
    });
    describe("URLs", function () {
        it("recognizes chronology URLs", function () {
            expect(org.rr0.time.isTimeURL("/time/1/9/9/0/index.html")).toBe(true);
            expect(org.rr0.time.isTimeURL("/science/index.html")).toBe(false);
        });
        it("produces links to chronology pages", function () {
            expect(org.rr0.time.yearLink("1990")).toBe("/time/1/9/9/0");
            expect(org.rr0.time.yearLink("1990", true)).toBe("/time/1/9/9/");
        });
    });
    describe("parse", function () {
        /*  it("parses ISO date", function () {
         var dateMoment1 = org.rr0.time.NewMoment();
         dateMoment1.set
         });*/
        it("parses ISO date", function () {
            var dateMoment1 = org.rr0.time.NewMoment();
            var date1 = dateMoment1.fromString('1998-08-30');
            expect(date1.getYear()).toBe(1998);
            expect(date1.getMonth()).toBe(8);
            expect(date1.getDayOfMonth()).toBe(30);
        });
        it("parses ISO datetime", function () {
            var dateMoment = org.rr0.time.NewMoment();
            var date = dateMoment.fromString('1998-08-31 17:35');
            expect(date.getYear()).toBe(1998);
            expect(date.getMonth()).toBe(8);
            expect(date.getDayOfMonth()).toBe(31);
            expect(date.getHour()).toBe(17);
            expect(date.getMinutes()).toBe(35);
        });
        describe("contextually", function () {
            var dateMoment = org.rr0.time.NewMoment();
            var date = dateMoment.fromString('1998-08-30');

           /* it("parses day", function () {
                date = dateMoment.fromString('31');
                expect(date.getYear()).toBe(1998);
                expect(date.getMonth()).toBe(8);
                expect(date.getDayOfMonth()).toBe(31);
            });*/
        });
    });
    describe("encode", function () {
        it("ISO string", function () {
            var dateMoment = org.rr0.time.NewMoment();
            dateMoment.setYear(1998);
            dateMoment.setMonth(8);
            dateMoment.setDayOfMonth(31);
            expect(dateMoment.toISOString()).toBe('1998-08-31');

            var timeMoment = org.rr0.time.NewMoment();
            timeMoment.setYear(1998);
            timeMoment.setMonth(8);
            timeMoment.setDayOfMonth(31);
            timeMoment.setHour(16);
            timeMoment.setMinutes(38);
            expect(timeMoment.toISOString()).toBe('1998-08-31T16:38');
        });
    });
});