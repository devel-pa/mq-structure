'use strict';

const { expect, getSinonSandbox } = require('@itavy/test-utilities');
const { MQSerializer, MQMessage } = require('../../');

describe('Serializer', () => {
  let sandbox;

  beforeEach((done) => {
    sandbox = getSinonSandbox();
    done();
  });

  afterEach((done) => {
    sandbox.restore();
    done();
  });


  it('Should return a buffer', () => {
    const serializer = Reflect.construct(MQSerializer, []);
    const mapSpy = sandbox.spy(serializer.messagesVersion, 'get');

    return serializer.serialize(Reflect.construct(MQMessage, [{}]))
      .should.be.fulfilled
      .then((response) => {
        expect(mapSpy.callCount).to.be.equal(1);
        expect(mapSpy.getCall(0).args).to.be.eql(['1']);
        expect(response).to.be.instanceof(Buffer);
        return Promise.resolve();
      });
  });
});
