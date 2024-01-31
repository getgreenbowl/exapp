# Usage
```ts
const form = useForm({
    initialValues: {
        mobile: undefined,
        password: undefined,
        os: Platform.OS === "ios" ? "ios" : "android",
    },
    rules: v_login,
});
```

# Passing input props
```ts
    <InputField
    label="Mobile Number"
    keyboardType="phone-pad"
    pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
    {...form.getRnInputProps("mobile")}
    />
```