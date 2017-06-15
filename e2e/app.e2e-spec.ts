import { ExAppPage } from './app.po';

describe('ex-app App', () => {
  let page: ExAppPage;

  beforeEach(() => {
    page = new ExAppPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
