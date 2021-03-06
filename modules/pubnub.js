// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// Lookup Customers with Clearbit
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
opengrowth.modules.pubnub = {};
opengrowth.modules.pubnub.silver = (message) => {

    // Skip if missing API Keys
    if (!opengrowth.keys.pubnub.silver_publish) return (new Promise()).resolve({
        message : 'PubNub disabled. No Pub Key.'
    });

    if (!opengrowth.keys.pubnub.silver_subscribe) return (new Promise()).resolve({
        message : 'PubNub disabled. No Sub Key.'
    });

    // B64 Encode Auth Header
    const pub_key = opengrowth.keys.pubnub.silver_publish;
    const sub_key = opengrowth.keys.pubnub.silver_subscribe;
    const chncopy = 'opengrowth.signals';
    const msgcopy = JSON.stringify(message)
    const url     = 'http://pubsub.pubnub.com/publish/' + [
        pub_key, sub_key, 0, chncopy, 0, msgcopy
    ].join('/')

    // Get Customer Bio
    return new Promise( ( resolve, reject ) => {
        xhr.fetch(url).then( response => {
            resolve(JSON.parse(response.body));
        } ).catch( err => {
            console.log( 'Pubnub Error:', err );
        } );
    } );

};

