var model = require('../models/models.js');

var Bosses = [];
var Servers = [];
var DredgeEvents = [new model.EventClass("64B94537-00D5-4CB6-8558-44987A9C5F76", "Pre"),
                    new model.EventClass("95CA969B-0CC6-4604-B166-DBCCE125864F", "Active")];

var FireEleEvents = [new model.EventClass("5E4E9CD9-DD7C-49DB-8392-C99E1EF4E7DF", "Escort"),
                    new model.EventClass("2C833C11-5CD5-4D96-A4CE-A74C04C9A278", "Defend"),
                    new model.EventClass("33F76E9E-0BB6-46D0-A3A9-BE4CDFC4A3A4", "Active")];

var GolemEvents = [new model.EventClass("3ED4FEB4-A976-4597-94E8-8BFD9053522F", "Containers Pre"),
                    new model.EventClass("9AA133DC-F630-4A0E-BB5D-EE34A2B306C2", "Active")];

var UlgothEvents = [new model.EventClass("DA465AE1-4D89-4972-AD66-A9BE3C5A1823", "Defend Kingsgate"),
                    new model.EventClass("E6872A86-E434-4FC1-B803-89921FF0F6D6", "Active")];

var WurmEvents = [new model.EventClass("613A7660-8F3A-4897-8FAC-8747C12E42F8", "Escort Gamarien Pre"),
                    new model.EventClass("1DCFE4AA-A2BD-44AC-8655-BBD508C505D1", "Grubs"),
                    new model.EventClass("61BA7299-6213-4569-948B-864100F35E16", "Avatars Pre"),
                    new model.EventClass("C5972F64-B894-45B4-BC31-2DEEA6B7C033", "Active")];

var KarkaQueenEvents = [new model.EventClass("E1CC6E63-EFFE-4986-A321-95C89EA58C07", "Active"),
                    new model.EventClass("5282B66A-126F-4DA4-8E9D-0D9802227B6D", "Active"),
                    new model.EventClass("F479B4CF-2E11-457A-B279-90822511B53B", "Active"),
                    new model.EventClass("4CF7AA6E-4D84-48A6-A3D1-A91B94CCAD56", "Active")];

var MawEvents = [new model.EventClass("6F516B2C-BD87-41A9-9197-A209538BB9DF", "Grawl Restless"),
                    new model.EventClass("D5F31E0B-E0E3-42E3-87EC-337B3037F437", "Escort Scholar"),
                    new model.EventClass("6565EFD4-6E37-4C26-A3EA-F47B368C866D", "Destroy Totem"),
                    new model.EventClass("374FC8CB-7AB7-4381-AC71-14BFB30D3019", "Portals"),
                    new model.EventClass("F7D9D427-5E54-4F12-977A-9809B23FBA99", "Active")];

var SBEvents = [new model.EventClass("AFCF031A-F71D-4CEA-85E1-957179414B25", "Outside Portals"),
                    new model.EventClass("36330140-7A61-4708-99EB-010B10420E39", "Inside Portals"),
                    new model.EventClass("31CEBA08-E44D-472F-81B0-7143D73797F5", "Active")];

Bosses.push(new model.BossClass("Dredge", DredgeEvents));
Bosses.push(new model.BossClass("Fire Ele", FireEleEvents));
Bosses.push(new model.BossClass("Golem", GolemEvents));
Bosses.push(new model.BossClass("Modinir Ulgoth", UlgothEvents));
Bosses.push(new model.BossClass("Wurm", WurmEvents));
Bosses.push(new model.BossClass("Karka Queen", KarkaQueenEvents));
Bosses.push(new model.BossClass("Maw", MawEvents));
Bosses.push(new model.BossClass("SB", SBEvents));

Servers.push(new model.ServerClass(1013, "SoR"));
Servers.push(new model.ServerClass(1008, "Jade Quarry"));
Servers.push(new model.ServerClass(1005, "Maguuma"));



exports.Bosses = Bosses;
exports.Servers = Servers;