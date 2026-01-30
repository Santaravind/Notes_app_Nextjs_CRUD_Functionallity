import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxLength: 100,
  },
  content: {
    type: String,
    required: true,
    maxLength: 1000,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
  updateAt: {
    type: Date,
    default: Date.now,
  },
});

NoteSchema.pre("save", function () {
  this.updateAt = Date.now();
});

export default mongoose.models.Note || mongoose.model("Note", NoteSchema);
