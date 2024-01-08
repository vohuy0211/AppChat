const dev = {
    db: {
        HOST: '127.0.0.1',
        USER: 'root',
        PASSWORD: '02112003Huy',
        DATABASE: 'appchat',
        dialect: 'mysql',
        define: {
            timestamps: true,
            underscored: true,
            freezeTableName: true,
            paranoid: true,
        },
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 1000,
    },
};

export default dev;