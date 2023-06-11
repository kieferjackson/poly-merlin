# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2023_06_11_210237) do
  create_table "copolymer_series", force: :cascade do |t|
    t.string "name"
    t.text "description"
    t.string "percent_type"
    t.integer "func_group_a_id"
    t.integer "func_group_b_id"
    t.integer "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["func_group_a_id"], name: "index_copolymer_series_on_func_group_a_id"
    t.index ["func_group_b_id"], name: "index_copolymer_series_on_func_group_b_id"
    t.index ["user_id"], name: "index_copolymer_series_on_user_id"
  end

  create_table "func_groups", force: :cascade do |t|
    t.string "name"
    t.integer "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_func_groups_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.string "email"
    t.string "password"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "copolymer_series", "users"
  add_foreign_key "copolymer_series", "users", column: "func_group_a_id"
  add_foreign_key "copolymer_series", "users", column: "func_group_b_id"
  add_foreign_key "func_groups", "users"
end