describe("Time", function() {
    it("recognizes chronology URLs", function() {
        expect(org.rr0.time.isTimeURL("/time/1/9/9/1/index.html")).toBe(true);
        expect(org.rr0.time.isTimeURL("/science/index.html")).toBe(false);
    })
});