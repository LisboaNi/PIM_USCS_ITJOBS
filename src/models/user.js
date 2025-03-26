// models/user.js

const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const TypeUser = sequelize.define("TypeUser", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  type_name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

const User = sequelize.define(
  "User",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cpf_cnpj: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type_user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "type_users",
        key: "id",
      },
    },
  },
  {
    tableName: "users",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    paranoid: true,
    deletedAt: "deleted_at",
  },
);

const UserProfissionalProfile = sequelize.define(
  "UserProfissionalProfile",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    nome_completo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    data_nascimento: {
      type: DataTypes.DATE,
    },
    contato: {
      type: DataTypes.STRING,
    },
    nacionalidade: {
      type: DataTypes.STRING,
    },
    endereco_rua: {
      type: DataTypes.STRING,
    },
    endereco_cep: {
      type: DataTypes.STRING,
    },
    endereco_cidade: {
      type: DataTypes.STRING,
    },
    endereco_bairro: {
      type: DataTypes.STRING,
    },
    descricao: {
      type: DataTypes.STRING(30),
    },
    estado_civil: {
      type: DataTypes.INTEGER,
      references: {
        model: "estado_civil",
        key: "id",
      },
    },
    identidade_genero: {
      type: DataTypes.INTEGER,
      references: {
        model: "identidade_genero",
        key: "id",
      },
    },
    orientacao_sexual: {
      type: DataTypes.INTEGER,
      references: {
        model: "orientacao_sexual",
        key: "id",
      },
    },
    raca_etnia: {
      type: DataTypes.INTEGER,
      references: {
        model: "raca_etnia",
        key: "id",
      },
    },
    resumo: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    deficiencia: {
      type: DataTypes.BOOLEAN,
    },
    avatar: {
      type: DataTypes.TEXT,
    },
    github: {
      type: DataTypes.STRING,
    },
    website: {
      type: DataTypes.STRING,
    },
    portfolio: {
      type: DataTypes.STRING,
    },
    link_curriculo: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "user_profissional_profile",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
    paranoid: true,
  },
);

const UserEmpresaProfile = sequelize.define(
  "UserEmpresaProfile",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    nome_completo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nacionalidade: DataTypes.STRING,
    contato: DataTypes.STRING,
    resumo: DataTypes.TEXT,
    avatar: DataTypes.STRING,
  },
  {
    tableName: "user_empresa_profile",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
    paranoid: true,
  },
);

User.belongsTo(TypeUser, { foreignKey: "type_user_id", as: "typeUser" });
User.hasOne(UserProfissionalProfile, { foreignKey: "user_id", as: "profile" });
User.hasOne(UserEmpresaProfile, {
  foreignKey: "user_id",
  as: "empresaProfile",
});

UserProfissionalProfile.belongsTo(User, { foreignKey: "user_id" });
UserEmpresaProfile.belongsTo(User, { foreignKey: "user_id" });

module.exports = {
  TypeUser,
  User,
  UserProfissionalProfile,
  UserEmpresaProfile,
  sequelize,
};
