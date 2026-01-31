export const usePreferences = () => {
    const handleSave = () => {
        // In a real app, this would persist the preferences to a database/local storage
        console.log('Preferences saved');
    };

    const handleCancel = () => {
        // In a real app, this might reset the form or navigate back
        console.log('Preferences changes cancelled');
    };

    return {
        handleSave,
        handleCancel
    };
};
