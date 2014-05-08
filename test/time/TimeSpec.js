describe("Time", function() {
    it("recognizes chronology URLs", function() {
        expect(org.rr0.time.isTimeURL("http://rr0.org/time/1/9/9/1/index.html")).toBe(true);
    })
});