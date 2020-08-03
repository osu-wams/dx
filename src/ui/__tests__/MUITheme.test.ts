import getMUITheme from '../MUITheme'

describe('Material UI component theme', () => {
  it('returns undefined pallette type when passed anything other then dark', () => {
    const MUITheme = getMUITheme('light');
    expect(MUITheme.palette.type).toBeUndefined;
  })

  it('returns dark pallette type when passed the value dark', () => {
    const MUITheme = getMUITheme('dark');
    expect(MUITheme.palette.type).toEqual('dark');
  })
})