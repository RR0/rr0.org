describe("Time module", function () {

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