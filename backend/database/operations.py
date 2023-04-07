def add_in_db(item, db):
    db.add(item)
    db.commit()
    db.refresh(item)
    db.close()