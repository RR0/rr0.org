describe("Time module", function () {
    it("recognizes chronology URLs", function () {
        expect(org.rr0.time.isTimeURL("/time/1/9/9/0/index.html")).toBe(true);
        expect(org.rr0.time.isTimeURL("/science/index.html")).toBe(false);
    });
    it("produces links to chronology pages", function () {
        expect(org.rr0.time.yearLink("1990")).toBe("/time/1/9/9/0");
        expect(org.rr0.time.yearLink("1990", true)).toBe("/time/1/9/9/");
    });
    it("sets current month", function () {
        org.rr0.time.setMonth(2);
        expect(org.rr0.time.getMonth()).toBe(2);
    });
});