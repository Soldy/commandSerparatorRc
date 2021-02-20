
const nanoTest  = new (require('nanoTest')).test({
    'debugPrint' : 'short'
});
const separatorrc = new (require('./index.js')).base();
const testC ='test command "rebel param tam" ; multi \\ command\\ b ;;;';
const expectation =[
    [
       'test',
       'command',
       'rebel param tam'
    ],[
       'multi',
       ' command b'
    ]
];

nanoTest.add(
    'multi command',
    {
        'function':separatorrc.check,
        'options':[testC]
    },
    'j==',
    expectation
);

nanoTest.run();


