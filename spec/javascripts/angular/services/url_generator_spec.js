//= require spec_helper
describe('URLGenerator', function() {
  var urlGenerator;
  beforeEach(inject(function(_URLGenerator_) {
    urlGenerator = _URLGenerator_;
  }));

  it('allows urls with custom paths, no trailing slash', function() {
    ['http://promdash.server.com/prometheus', 'http://promdash.com'].forEach(function(s) {
      ['/api/query_range', '/api/query', '/api/metrics', '/arbitrary/endpoint'].forEach(function(ep) {
        var url = urlGenerator(s, ep, {});
        expect(url).toEqual(s + ep);
      });
    });
  });

  it('allows urls with custom paths, no leading slash', function() {
    ['http://promdash.server.com/prometheus', 'http://promdash.com'].forEach(function(s) {
      ['api/query_range', 'api/query', 'api/metrics', 'arbitrary/endpoint'].forEach(function(ep) {
        var url = urlGenerator(s, ep, {});
        expect(url).toEqual(s + '/' + ep);
      });
    });
  });

  it('allows urls with custom paths, with trailing slash', function() {
    ['http://promdash.server.com/prometheus/', 'http://promdash.com/'].forEach(function(s) {
      ['/api/query_range', '/api/query', '/api/metrics', '/arbitrary/endpoint'].forEach(function(ep) {
        var url = urlGenerator(s, ep, {});
        expect(url).toEqual(s.substring(0, s.length - 1) + ep);
      });
    });
  });

  it('interpolates into urls', function() {
    var s = 'http://promdash.{{zone}}.com/prometheus';
    ['aa', 'bb', 'cc', 'dd'].forEach(function(zone) {
      var url = urlGenerator(s, '', {zone: zone});
      expect(url).toEqual('http://promdash.' + zone + '.com/prometheus');
    });
  });
});
