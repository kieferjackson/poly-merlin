class CreateCopolymerSeries < ActiveRecord::Migration[7.0]
  def change
    create_table :copolymer_series do |t|
      t.string :name
      t.text :description
      t.string :percent_type
      t.references :func_group_a, null: false, foreign_key: true
      t.references :func_group_b, null: false, foreign_key: true
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
    # Relate copolymer series to its given functional groups
    add_foreign_key :copolymer_series, :func_groups
    add_foreign_key :copolymer_series, :func_groups
  end
end
