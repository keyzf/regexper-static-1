import React from 'react';
import { shallow } from 'enzyme';

import App from 'components/App';

const syntaxList = [
  { id: 'testJS', name: 'Testing JS' },
  { id: 'other', name: 'Other' }
];

describe('App', () => {
  test('rendering', () => {
    const component = shallow(
      <App expr="" syntax="js" syntaxList={ syntaxList } />
    );
    expect(component).toMatchSnapshot();
  });

  test('rendering an expression', async () => {
    const component = shallow(
      <App expr="" syntax="js" syntaxList={ syntaxList } />
    );
    expect(component).toMatchSnapshot();

    component.setProps({
      expr: 'test expression'
    });

    expect(component).toMatchSnapshot();

    // Give a beat for module to load
    await new Promise(resolve => setTimeout(resolve));

    expect(component).toMatchSnapshot();
  });

  test('rendering with an invalid syntax', async () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});

    const component = shallow(
      <App expr="" syntax="invalid" syntaxList={ syntaxList } />
    );
    expect(component).toMatchSnapshot();

    component.setProps({
      expr: 'test expression'
    });

    expect(component).toMatchSnapshot();

    // Give a beat for module to load
    await new Promise(resolve => setTimeout(resolve));

    expect(component).toMatchSnapshot();
  });

  test('removing rendered expression', async () => {
    const component = shallow(
      <App expr="test expression" syntax="js" syntaxList={ syntaxList } />
    );

    // Give a beat for module to load
    await new Promise(resolve => setTimeout(resolve));

    expect(component).toMatchSnapshot();

    component.setProps({
      expr: ''
    });

    expect(component).toMatchSnapshot();
  });

  test('rendering image details', async () => {
    const component = shallow(
      <App expr="test expression" syntax="js" syntaxList={ syntaxList } />
    );

    // Give a beat for module to load
    await new Promise(resolve => setTimeout(resolve));

    expect(component).toMatchSnapshot();

    component.instance().handleSvg({
      svg: 'test svg content'
    });

    expect(component).toMatchSnapshot();
  });

  test('retrying expression rendering', () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});

    const component = shallow(
      <App expr="test expression" syntax="invalid" syntaxList={ syntaxList } />
    );

    const instance = component.instance();
    const event = { preventDefault: jest.fn() };

    jest.spyOn(instance, 'handleRender');

    instance.handleRetry(event);

    expect(event.preventDefault).toHaveBeenCalled();
    expect(instance.handleRender).toHaveBeenCalled();
  });

  test('submitting an expression to render', () => {
    const component = shallow(
      <App expr="" syntax="js" syntaxList={ syntaxList } />
    );

    const instance = component.instance();

    instance.handleSubmit({ syntax: 'test', expr: '' });

    expect(document.location.hash).toEqual('');

    instance.handleSubmit({ syntax: 'test', expr: 'test expression' });

    expect(document.location.hash).toEqual('#syntax=test&expr=test+expression');
  });
});
