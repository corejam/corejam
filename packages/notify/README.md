# @corejam/notify

This package can be used to provide notification (mail, sms, push) functionality through the corejam servers context object.

For example in your resolver:

```typescript
Mutation: {
    myMutation: async (_obj: any, args: any, { notify }: MergedServerContext) => {
        await notify.sendMail({to: "mail@mail.com"})

        notify.sendSMS() //Coming soon
        notify.pushNotification() //Coming soon
}
```

## Mail

Please view the .env.sample for the correct env variables required for mail setup.

Currently we support the following mail transports:

```
AMAZON SES
```



## Getting Started

